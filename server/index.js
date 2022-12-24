const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const FoodModel = require("./models/Food");
const { $where, update } = require("./models/Food");

app.use(express.json());

// cors permet de passer la data du back au front
app.use(cors());

mongoose.connect(
    "mongodb+srv://pizatol:3VeKYVtPRo03N5yn@cluster0.y8gkjya.mongodb.net/food?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
    }
);

app.post("/insert", async (req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;

    const food = new FoodModel({
        foodName: foodName,
        daysSinceIAte: days,
    });

    try {
        // food.save() enregistre les infos dans la database
        await food.save();
        res.send("inserted data");
    } catch (error) {
        console.log(error);
    }
});

app.get("/read", async (req, res) => {
    FoodModel.find({}, (error, result) => {
        if (error) {
            res.send(error);
        }
        res.send(result);
    });
});
// UPDATE
app.put("/update", async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try {
        await FoodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("update");
        });
    } catch (error) {
        console.log(error);
    }
});
// DELETE
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await FoodModel.findByIdAndRemove(id).exec()
    res.send('deleted')
});



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});


