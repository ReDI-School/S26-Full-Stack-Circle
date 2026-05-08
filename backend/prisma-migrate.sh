#!/bin/sh

output=$(npx prisma migrate deploy 2>&1)
status=$?
echo "$output"

if [ $status -eq 0 ]; then
  npx prisma db push --skip-generate
  exit 0
fi

if echo "$output" | grep -q "P3005"; then
  echo "P3005 detected - creating tables and baselining migrations..."
  npx prisma db push --skip-generate

  for dir in prisma/migrations/*/; do
    migration_name=$(basename "$dir")
    if [ "$migration_name" != "migration_lock.toml" ]; then
      echo "Resolving migration: $migration_name"
      npx prisma migrate resolve --applied "$migration_name" 2>/dev/null || true
    fi
  done
  exit 0
fi

exit $status
