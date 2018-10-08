import {
    Model, 
    Column, 
    Table, 
    PrimaryKey,
    DataType
} from "sequelize-typescript";

@Table
export class Stock extends Model<Stock> {

    @PrimaryKey
    @Column(DataType.STRING)
    name: string;
  
    @Column(DataType.FLOAT)
    currentPrice: number;
    
    @Column(DataType.FLOAT)
    openedPrice: number;
  }

  export default Stock;