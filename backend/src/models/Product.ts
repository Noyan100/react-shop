import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

// Define interfaces for nested objects
interface ProductItem {
  color?: string;
  photos: string[];
}

interface ProductReview {
  name: string;
  title: string;
  text: string;
  date: string;
  stars: number;
}

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare cost: number;
  declare sale: number;
  declare rating: number;
  declare category: string;
  declare featured: string;
  declare items: ProductItem[];
  declare reviews: ProductReview[];
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sale: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    reviews: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Product",
  }
);

export default Product;
