set -e

mongosh -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} << EOF

db = db.getSiblingDB('${MONGO_INITDB_DATABASE}')

db.createCollection('knights')

db.knights.insertMany( [
  {
    name: "Fernando",
    nickname: "fcorrea",
    birthday: new Date( "1981-05-05T00:00:00Z" ),
    weapons: [
      {
        name: "sword",
        mod: 3,
        attr: " strength",
        equipped: true,
      }
    ],
    attributes: {
      strength: 20,
      dexterity: 15,
      constitution: 12,
      intelligence: 8,
      wisdom: 10,
      charisma: 13,
    },
    keyAttribute: "strength"
  },
  {
    name: "Yan",
    nickname: "Yac",
    birthday: new Date( "2015-03-16T00:00:00Z" ),
    weapons: [
      {
        name: "sword",
        mod: 3,
        attr: " strength",
        equipped: true,
      }
    ],
    attributes: {
      strength: 20,
      dexterity: 15,
      constitution: 12,
      intelligence: 8,
      wisdom: 10,
      charisma: 13,
    },
    keyAttribute: "strength"
  },
  {
    name: "Karina",
    nickname: "Kaka",
    birthday: new Date( "1980-01-11T00:00:00Z" ),
    weapons: [
      {
        name: "sword",
        mod: 3,
        attr: " strength",
        equipped: true,
      }
    ],
    attributes: {
      strength: 20,
      dexterity: 15,
      constitution: 12,
      intelligence: 8,
      wisdom: 10,
      charisma: 13,
    },
    keyAttribute: "strength"
  },
] );

EOF