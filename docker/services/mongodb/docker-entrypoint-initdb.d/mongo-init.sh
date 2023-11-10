set -e

mongosh -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} << EOF

db = db.getSiblingDB('${MONGO_INITDB_DATABASE}')

db.createCollection('dummy')

EOF