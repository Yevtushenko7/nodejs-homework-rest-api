const { User } = require('../../model');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public/avatars');

const updateAvatar = async (req, res) => {
    
    const { _id } = req.user;
    const { originalname, path: tempPath } = req.file;
    const dirPath = path.join(avatarsDir, `${_id}`);
    const uploadPath = path.join(dirPath, originalname);

    try {
        await fs.mkdir(dirPath);
        const file = await Jimp.read(tempPath);
        await file.resize(250, 250).write(tempPath);
        await fs.rename(tempPath, uploadPath);
        const avatarURL = `/public/avatars/${_id}/${originalname}`;
        const user = await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            user
        })
    } catch (error) {
        fs.unlink(tempPath);
        throw error;
    }
    
};

module.exports = updateAvatar;
