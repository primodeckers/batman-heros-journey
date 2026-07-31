import { feature } from 'topojson-client'
import type { Feature, Geometry } from 'geojson'
import type { Topology, GeometryCollection } from 'topojson-specification'

export async function loadWorldCountries(): Promise<Feature<Geometry>[]> {
  const res = await fetch('/data/world-countries-110m.json')
  const topology = (await res.json()) as Topology

  const countries = topology.objects.countries as GeometryCollection
  const collection = feature(topology, countries)

  return 'features' in collection ? collection.features : [collection]
}
