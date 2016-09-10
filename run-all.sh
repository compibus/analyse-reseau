#!/usr/bin/env bash

echo "Filtering IRIS geography data to Compiègne ..."
echo "============================================================================"
node 1-filter-iris-geography.js

echo ""
echo "Filtering IRIS population data to Compiègne ..."
echo "============================================================================"
node 2-filter-iris-population.js

echo ""
echo "Associate populations and geography areas ..."
echo "============================================================================"
node 3-compute-areas-populations.js

echo ""
echo "Create raw grid of dots ..."
echo "============================================================================"
node 4-create-grid.js

echo ""
echo "Associate population to grid dots ..."
echo "============================================================================"
node 5-compute-grid-population.js

echo ""
echo "Parsing stations from raw data ..."
echo "============================================================================"
node 6-create-stations.js

echo ""
echo "Computing average distance result ..."
echo "============================================================================"
node 7-result-average-distance.js
