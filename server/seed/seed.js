import { sequelize, User, Recipe } from "../src/db/index.js";
import { hashPassword } from "../src/utilities/bcryptUtils.js";

const seed = async () => {
    try {
        await sequelize.sync({ force: true });

        const password = await hashPassword("password123");
        const alice = await User.create({ name: "Alice", email: "alice@example.com", password });
        const bob = await User.create({ name: "Bob", email: "bob@example.com", password });

        await Recipe.bulkCreate([
            {
                author_id: alice.user_id,
                title: "Classic Chicken Curry",
                description: "Comforting Indian-style chicken curry.",
                image_url: "https://picsum.photos/seed/chicken/400/240",
                prep_time: 20,
                cook_time: 40,
                ingredients: ["chicken", "onion", "tomato", "garam masala", "ginger", "garlic"],
                instructions: [
                    "Marinate chicken with spices",
                    "Saute onions until golden",
                    "Add tomatoes and cook down",
                    "Add chicken and simmer until tender",
                ],
            },
            {
                author_id: bob.user_id,
                title: "Creamy Tomato Pasta",
                description: "Italian comfort pasta in creamy tomato sauce.",
                image_url: "https://picsum.photos/seed/pasta/400/240",
                prep_time: 10,
                cook_time: 20,
                ingredients: ["pasta", "tomato", "cream", "garlic", "basil"],
                instructions: [
                    "Boil pasta until al dente",
                    "Saute garlic in olive oil",
                    "Add tomatoes and cream",
                    "Toss pasta and finish with basil",
                ],
            },
        ]);

        console.log("Seeding completed.");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seed();

