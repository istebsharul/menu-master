import MenuItem from "../../models/MenuItem.js";
import logger from "../../utils/logger.js";
import User from "../../models/User.js";

export const getMenu = async (req, res) => {
  try {
    const { userId, slug } = req.query;

    let user;

    if (userId) {
      user = await User.findById(userId);
    } else if (slug) {
      user = await User.findOne({ slug });
    } else {
      return res.status(400).json({ message: 'Slug or User ID is required in query params.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const items = await MenuItem.find({ userId: user._id }).populate('categoryId').sort({ createdAt: -1 });

    const publicUser = {
      id: user._id,
      name: user.name,
      businessName: user.businessName,
      logo: user.logo || '',
      slug: user.slug,
      address: user.address || '',
      phone: user.phone || '',
    };

    res.json({ restaurant: publicUser, menuItems: items });
  } catch (error) {
    logger.error(`Error fetching public menu: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
};