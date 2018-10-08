import {
    Model, 
    Column, 
    Table,
    DataType
} from "sequelize-typescript";

@Table
export class Action extends Model<Action> {

    @Column(DataType.STRING)
    stockName: string;
  
    @Column(DataType.STRING)
    type: string;

    @Column(DataType.FLOAT)
    priceAtAction: number;
    
    @Column(DataType.FLOAT)
    openedPrice: number;

    @Column(DataType.FLOAT)
    quantity: number;
  }

  export default Action;