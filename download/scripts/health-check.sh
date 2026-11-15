#!/usr/bin/env bash
# MIT.egy — Post-deployment health check
# Usage: ./scripts/health-check.sh [BASE_URL]
# Defaults to https://mit-egy.vercel.app

set -euo pipefail

BASE_URL="${1:-https://mit-egy.vercel.app}"
PASSED=0
FAILED=0
ERRORS=()

check() {
  local label="$1"
  local url="$2"
  local expected="${3:-200}"
  local actual
  actual=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "$url" || echo "000")
  if [ "$actual" = "$expected" ]; then
    printf "  \033[32m✓\033[0m %s → %s\n" "$label" "$actual"
    PASSED=$((PASSED + 1))
  else
    printf "  \033[31m✗\033[0m %s → %s (expected %s)\n" "$label" "$actual" "$expected"
    FAILED=$((FAILED + 1))
    ERRORS+=("$label ($url): got $actual, expected $expected")
  fi
}

printf "\n\033[1mMIT.egy — Health Check\033[0m\n"
printf "Target: %s\n\n" "$BASE_URL"

printf "\033[1mStatic Pages\033[0m\n"
check "Home"            "$BASE_URL/"
check "Projects"        "$BASE_URL/projects"
check "Services"        "$BASE_URL/services"
check "About"           "$BASE_URL/about"
check "Blog"            "$BASE_URL/blog"
check "Contact"         "$BASE_URL/contact"

printf "\n\033[1mSystem Files\033[0m\n"
check "sitemap.xml"     "$BASE_URL/sitemap.xml"
check "robots.txt"      "$BASE_URL/robots.txt"
check "favicon.svg"     "$BASE_URL/favicon.svg"
check "logo.svg"        "$BASE_URL/logo.svg"

printf "\n\033[1mProject Detail (sample)\033[0m\n"
check "Project: fintech-saas-payments"      "$BASE_URL/projects/fintech-saas-payments"
check "Project: ecommerce-fashion-maza"     "$BASE_URL/projects/ecommerce-fashion-maza"
check "Project: healthcare-booking-app"     "$BASE_URL/projects/healthcare-booking-app"

printf "\n\033[1mBlog Detail (sample)\033[0m\n"
check "Blog: guide-to-buying-your-first-saas-build"  "$BASE_URL/blog/guide-to-buying-your-first-saas-build"
check "Blog: best-markets-for-software-startups-2024" "$BASE_URL/blog/best-markets-for-software-startups-2024"

printf "\n\033[1mAPI\033[0m\n"
# /api/contact GET should return 405 (only POST allowed)
check "GET /api/contact (expect 405)"  "$BASE_URL/api/contact" "405"

printf "\n\033[1mSecurity Headers\033[0m\n"
headers=$(curl -s -I -L --max-time 10 "$BASE_URL/" || echo "")
for h in "Strict-Transport-Security" "X-Content-Type-Options" "Referrer-Policy" "Permissions-Policy" "Content-Security-Policy"; do
  if echo "$headers" | grep -qi "$h"; then
    printf "  \033[32m✓\033[0m %s present\n" "$h"
    PASSED=$((PASSED + 1))
  else
    printf "  \033[31m✗\033[0m %s MISSING\n" "$h"
    FAILED=$((FAILED + 1))
    ERRORS+=("Security header $h missing")
  fi
done

# Summary
printf "\n\033[1mSummary\033[0m\n"
printf "  Passed: \033[32m%s\033[0m\n" "$PASSED"
printf "  Failed: \033[31m%s\033[0m\n" "$FAILED"

if [ "$FAILED" -gt 0 ]; then
  printf "\n\033[31mFailures:\033[0m\n"
  for err in "${ERRORS[@]}"; do
    printf "  - %s\n" "$err"
  done
  exit 1
else
  printf "\n\033[32mAll checks passed.\033[0m\n"
  exit 0
fi
