# 2. Modéalisation du réseau de bus sous forme de graphe

## Première étape : Répartition de la population

L'INSEE a créé en 2000 un découpage du territoire en zones homogènes en terme de population. Ces zones sont appelées "Ilots Regroupés pour l'Information Statistique", ou IRIS.

L'INSEE fournit des statistiques de population pour chaque IRIS indépendant, ce qui correspond au besoin du projet quant à la répartition de la population à Compiègne.

J'ai trouvé la population de 2012 par IRIS ici : http://www.insee.fr/fr/themes/detail.asp?reg_id=99&ref_id=infra-population-12

Résultat : raw/base-ic-evol-struct-pop-2012.xls

J'ai pu extraire (manuellement) de cette base de donnée les informations de population de Compiègne. J'ai transformé ces données en JSON grâce à un petit script.

Résultat : built/iris-population.csv

Problème : l'INSEE ne fournit pas les délimitation des IRIS dans une format utilisable informatiquement (seulement en images: cf raw/insee-iris-compiegne.pdf).

## Deuxième étape : Délimitation des IRIS

J'ai donc trouvé ces délimitations sur le site officiel de l'OpenData français en format GeoJSON, très utilisable : https://www.data.gouv.fr/fr/reuses/le-contour-des-iris-pour-france-metropolitaine-et-les-dom-tom/

Une fois téléchargé, j'ai développé un script (build-iris.js) pour isoler les IRIS de Compiègne.

Résultat : built/iris.json

Afin de m'assurer de la pertinence des données reccueillies, j'ai recréé des zones GeoJSON et je les ai importées sur l'outil http://geojson.io. J'ai alors vu que les zones déterminées sont valides.

Résultat : built/iris.jpg


# 2. Calcul de la densité de population par zone

Ayant désormais les délimitations des zones et la population de chaque zone, il ne reste plus qu'à unifier les deux jeux de données en calculant au

Cette étape est l'unification des deux sets de données récupérés dans la première partie.

Au moyen du script compute-densities.js, j'ai effectué cette unification et j'ai calculé les densités de population pour chaque zone. Pour cela, j'ai utilisé la librairie https://github.com/mapbox/geojson-area pour calculer la surface des zones et j'ai divisé par le nombre d'habitant de chaque zone.

Dans un premier temps, j'ai choisi de considérer que les densités de populations étaient uniformes sur leur IRIS : je vais répartir chaque habitant de Compiègne selon ces zones, à équidistance les uns des autres au sein de ces zones.

Résultat : built/densities.json

J'ai visualisé le contenu de ce fichier au moyen de GeoJSON en appliquant une opacité différente selon la densité de population de chaque IRIS. Cela m'a permis de déterminer les zones de Compiègne les plus densément peuplées.

Résultat : built/densities.png