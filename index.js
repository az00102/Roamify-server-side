require('dotenv').config();
const { ObjectId } = require('mongodb');

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*'
}));
app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI; // MONGODB_URI environment variable

// Connect to MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

// route handler for the root URL
app.get('/', (req, res) => {
    res.send('Travel database server is running');
});


// Add a tourist spot
app.post('/api/tourist-spots', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('tourist_spots');
        const result = await collection.insertOne(req.body);
        res.status(201).json({ message: 'Tourist spot added successfully', insertedId: result.insertedId });
    } catch (error) {
        console.error('Error adding tourist spot:', error);
        res.status(500).json({ message: 'An error occurred while adding the tourist spot' });
    }
});

// Get all tourist spots
app.get('/api/tourist-spots', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('tourist_spots');
        const spots = await collection.find({}).toArray();
        res.status(200).json(spots);
    } catch (error) {
        console.error('Error fetching tourist spots:', error);
        res.status(500).json({ message: 'An error occurred while fetching tourist spots' });
    }
});

// Get a single tourist spot by ID
app.get('/api/tourist-spots/:id', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('tourist_spots');
        const spot = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!spot) {
            return res.status(404).json({ message: 'Tourist spot not found' });
        }
        res.status(200).json(spot);
    } catch (error) {
        console.error('Error fetching tourist spot:', error);
        res.status(500).json({ message: 'An error occurred while fetching tourist spot' });
    }
});

// Update a tourist spot by ID
app.put('/api/tourist-spots/:id', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('tourist_spots');

        // Extract _id field from the update data
        const { _id, ...updatedData } = req.body;

        // Update the document excluding the _id field
        const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedData });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Tourist spot not found' });
        }

        res.status(200).json({ message: 'Tourist spot updated successfully' });
    } catch (error) {
        console.error('Error updating tourist spot:', error);
        res.status(500).json({ message: 'An error occurred while updating tourist spot' });
    }
});

// Delete a tourist spot by ID
app.delete('/api/tourist-spots/:id', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('tourist_spots');
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Tourist spot not found' });
        }
        res.status(200).json({ message: 'Tourist spot deleted successfully' });
    } catch (error) {
        console.error('Error deleting tourist spot:', error);
        res.status(500).json({ message: 'An error occurred while deleting tourist spot' });
    }
});

// Define routes for countries

// Add a country
app.post('/api/countries', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('country');
        const result = await collection.insertOne(req.body); // Insert the data into the database
        res.status(201).json({ message: 'Country added successfully', insertedId: result.insertedId });
    } catch (error) {
        console.error('Error adding country:', error);
        res.status(500).json({ message: 'An error occurred while adding the country' });
    }
});

// Get all countries
app.get('/api/countries', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('country');
        const countries = await collection.find({}).toArray();
        res.status(200).json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ message: 'An error occurred while fetching countries' });
    }
});

// Get a single country by ID
app.get('/api/countries/:id', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('country');
        const country = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.status(200).json(country);
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).json({ message: 'An error occurred while fetching country' });
    }
});

// Update a country by ID
app.put('/api/countries/:id', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('country');

        // Extract _id field from the update data
        const { _id, ...updatedData } = req.body;

        // Update the document excluding the _id field
        const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedData });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Country not found' });
        }

        res.status(200).json({ message: 'Country updated successfully' });
    } catch (error) {
        console.error('Error updating country:', error);
        res.status(500).json({ message: 'An error occurred while updating country' });
    }
});

// Delete a country by ID
app.delete('/api/countries/:id', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('country');
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error('Error deleting country:', error);
        res.status(500).json({ message: 'An error occurred while deleting country' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Travel database server is running on port: ${port}`);
});
