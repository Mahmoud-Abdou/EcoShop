import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import users from './data/users.js'
import products from './data/products.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const insertedUsers = await User.insertMany(users)
        const adminUser = insertedUsers[0]._id

        const readyProducts = products.map(product => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(readyProducts)

        console.log('Done')
        process.exit()
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
} 

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log('Done')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}

if (process.argv[2] == '-d'){
    destroyData()
}
else{
    importData()
}