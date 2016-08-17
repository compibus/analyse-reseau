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

echo ""
echo "Computing grid and stations positions ..."
echo "============================================="
node compute-dots.js

echo ""
echo "Computing stations densities ..."
echo "============================================="
node compute-dots-densities.js
