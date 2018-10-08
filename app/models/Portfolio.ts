import {
    Model, 
    Column, 
    Table, 
    PrimaryKey,
    DataType
} from "sequelize-typescript";

@Table
export class Portfolio extends Model<Portfolio> {

    @PrimaryKey
    @Column(DataType.STRING)
    stockName: string;
  
    @Column
    quantity: number;
  }

  export default Portfolio;