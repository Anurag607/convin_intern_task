import { User } from '../models/auth.mjs'
import bcrypt from 'bcryptjs'

const registerUser = async (req, res) => {
    try {
        const confirm = await User.find({ username: req.body.username, email: req.body.email })
        if (confirm.length > 0) res.status(400).json({ message: 'this user or email exist' })
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const savedUserCred = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        try {
            const result = await savedUserCred.save()
            const { password, ...others } = result._doc
            res.status(200).json(others)
        } catch (err) {
            console.error(err.message)
            res.status(500).end()
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(400).json({ message: 'wrong user' })

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json({ message: 'wrong password' })

        const { password, ...others } = user._doc

        res.status(200).json(others)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

export { registerUser, loginUser }