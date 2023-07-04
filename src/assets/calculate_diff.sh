mlr --json --opprint filter '$coords.heading != null' then \
head -n 100 then \
flatten then \
step -a delta -f coords.latitude,coords.longitude then \
cut -xf coords.accuracy,coords.altitude,coords.altitudeAccuracy,id then \
stats1 -f coords.latitude_delta,coords.longitude_delta -a min,max,mean \
./src/assets/locationData.json