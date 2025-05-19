# chronic-disease-management-backend

npm i cors dotenv express jsonwebtoken mongoose ts-node winston @types/cors @types/dotenv @types/express @types/jsonwebtoken @types/mongoose @types/winston eslint husky jest nodemon ts-jest typescript

create .env file and include below variables

MONGO_DB_URI="mongodb://localhost:27017/chronic-disease-management"
JWT_SECRET=""
JWT_EXPIRE=10min
NODE_ENV=development
PORT=3000

tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}