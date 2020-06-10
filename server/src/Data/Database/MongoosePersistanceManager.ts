import { PersistanceManager } from "./PersistanceManager"
import mongoose from "mongoose"
import { injectable } from "inversify"

@injectable()
export class MongoosePersistanceManager implements PersistanceManager {
    connect() {
        mongoose
            .connect(process.env.connectionString!, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(() => {
                console.log("DB Connected")
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
