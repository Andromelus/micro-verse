- [Resources](#resources)
- [Ships](#ships)

# Resources
- Ore: Minable from stars

```mermaid
graph TD
subgraph ORE
    iron_ore(Iron)
end
subgraph INGOT
    iron_ingot(Iron)
end
iron_ore --> iron_ingot

```
# Ships
- Explorer
  - Analyze starts
  - Can find artifacts (celestus style)
  - Can transport one artifact
- Builder
  - Build station
  - Can carry a bit of resources
- Freighter
  - Can carry resources
