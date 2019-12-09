#!/bin/bash

echo "Starting import of dataset..."
osm2pgsql --create --slim --database gis --latlong --host localhost --username gis_user /importdata/baden-wuerttemberg-latest.osm.pbf
echo "Finished import of dataset import of dataset..."
echo "Database ready!"
