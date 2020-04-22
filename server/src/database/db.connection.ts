import mongoose from "mongoose"

export default class MongoConnection {
    connectionString: string

    constructor(connectionString: string) {
        this.connectionString = connectionString
    }

    connect = async () => {
        try {
            await mongoose.connect(this.connectionString, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            console.log(`Connected to MongoDB`)
        } catch (e) {
            console.log(e.message)
        }
    }
}
