import {Collection, DB, Tigris} from "@tigrisdata/core";
import {Product, productSchema} from "./models/user";

export class Application {
    private readonly tigris: Tigris;

    constructor(tigris: Tigris) {
        this.tigris = tigris;
    }

    public async tigrisQuickstart() {
        // create db if not exists
        const db: DB = await this.tigris.createDatabaseIfNotExists("hello_db");
        console.log("db created");
        // register or update collection
        const users: Collection<User> = await db.createOrUpdateCollection(
            "users",
            userSchema
        );
        console.log("collection created");

        // insert
        const jania: User = await users.insert({
            name: "Jania McGrory",
            balance: 6045.7,
        });
        console.log("user created with id = " + jania.userId);

        const bunny: User = await users.insert({
            name: "Bunny Instone",
            balance: 2948.87,
        });
        console.log("user created with id = " + bunny.userId);

        // find the user by pkey field
        const user1: User = await users.findOne({
            userId: jania.userId,
        });
        const user2: User = await users.findOne({
            userId: bunny.userId,
        });

        // update Jania's name
        await users.update(
            {
                userId: jania.userId,
            },
            {
                name: "Jania McGrover",
            }
        );
        console.log("user updated");

        // transaction - transfer balance between users
        await db.transact(async (tx) => {
            // find the user by pkey field
            const user1: User = await users.findOne(
                {
                    userId: jania.userId,
                },
                tx
            );
            const user2: User = await users.findOne(
                {
                    userId: bunny.userId,
                },
                tx
            );

            // update balance
            await users.update(
                {
                    userId: user1.userId,
                },
                {
                    balance: user1.balance - 100,
                },
                tx
            );

            await users.update(
                {
                    userId: user2.userId,
                },
                {
                    balance: user2.balance + 100,
                },
                tx
            );
            console.log("transaction performed - balance transferred between users");
        });

        // delete users
        await users.delete({
            userId: user1.userId,
        });
        await users.delete({
            userId: user2.userId,
        });
        console.log("users deleted");

        // drop database
        await this.tigris.dropDatabase("hello_db");
        console.log("database dropped");
    }
}
