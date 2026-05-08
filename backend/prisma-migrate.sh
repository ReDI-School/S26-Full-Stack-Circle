#!/bin/sh
set -e

npx prisma migrate deploy 2>&1 && exit 0

echo "migrate deploy failed, attempting to baseline existing migrations..."

for dir in prisma/migrations/*/; do
  migration_name=$(basename "$dir")
  if [ "$migration_name" != "migration_lock.toml" ]; then
    echo "Resolving migration: $migration_name"
    npx prisma migrate resolve --applied "$migration_name"
  fi
done

echo "Retrying migrate deploy..."
npx prisma migrate deploy
