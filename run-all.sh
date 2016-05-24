#!/usr/bin/env bash

echo "Filtering IRIS geography ..."
echo "============================================="
node filter-geography.js

echo ""
echo "Filtering IRIS population ..."
echo "============================================="
node filter-population.js

echo ""
echo "Computing IRIS densities ..."
echo "============================================="
node compute-densities.js
