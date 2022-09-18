const mongoose = require('mongoose');


// schema design
const productSchema = mongoose.Schema({
    // validation with properties
    name: {
        type: String,
        required: [true, ' Please provide a name'],
        // trim jeta kore, kono naam er age ar pore barti space thakle sheguloke remove kore dibe.
        trim: true,
        unique: [true, 'Name must be unique'],
        minLength: [3, 'Name must be atleast three characters'],
        maxLength: [100, 'Name is too large to accept']
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Price must need to be added'],
        min: [0, 'Price can not be a negative integer'],
    },
    unit: {
        type: String,
        required: true,
        // enum er moddhe amra predefined value gulo diye dite pari. jemon amra kg, litre ar pc chara ar kichu accept korbona.
        enum: {
            values: ['kg', 'litre', 'pcs'],
            message: `Unit value can't be 'VALUE'`
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'quantity can not be negative'],
        // we can even validate using regex here
        validate: {
            validator: (value) => {
                const isInt = Number.isInteger(value);
                if (isInt) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: 'Quantity must be an integer'
    },
    status: {
        type: String,
        reuired: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: ' Status can not be {Value}'
        }
    },
    // array of object for categories
    /* categories: [{
      name: {
        type: String,
        required: true
      },
      _id: mongoose.Schema.Types.ObjectId,
    }], */

    // saving the reference of supplier (this is efficient)
    // ekhane ref ar id jinishta important. karon, jokhon amra product load korbo, tokhon taar shathe shathe ei id er maddhome puro supplier data ke o niye ashte parbo. ref er ekhane supplier er schema ba details thakbe.
    /* suppiler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier'
    } */

    // ei duita jinish na kore amra mongoose er timestamp true kore dite pari.
    /* createdAt: {
      type: Date,
      defaultValue: Date.now,
    },
    updatedAt: {
      type: Date,
      defaultValue: Date.now
    } */
}, {
    timestamps: true,
})


// mongoose middleware for saving data :::: pre // post
// Pre --> pre kaaj korbe data save korar age
// Post --> kaaj korbe data save korar pore.

productSchema.pre('save', function (next) {
    // console.log('Before saving data');
    // ekhane product (data) receive korbo this keyword diye. ekhane this ta refer kortese data ke. jei data ta shtese.
    // this -->
    if (this.quantity == 0) {
        this.status = 'out-of-stock'
    }
    next()
})
/* productSchema.post('save', function (doc, next) {
  console.log('After saving data');
 
  next()
}) */

// injecting a function into an instance
productSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
}

// Schema -> model -> query
const Product = mongoose.model('Product', productSchema);
//exporting the model
module.exports = Product;