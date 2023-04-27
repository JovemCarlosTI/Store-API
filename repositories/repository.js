import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    "postgres://zzkfaepg:Hv9H6mjjirpJih4907FfwwAnjCthHTVN@lallah.db.elephantsql.com/zzkfaepg",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
)

export default sequelize;