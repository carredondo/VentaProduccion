"use strict";

module.exports = function (sequelize, DataTypes) {
    var customer = sequelize.define("customer", {
        fullname: { type: DataTypes.STRING, allowNull: false },
        numberid: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
    },{
        /*invalidate, invoice, orderbook, sale*/
 /*classMethods: {
        associate: function (models) {
          customer.belongsTo(models.invalidate, { foreignKey: "idinvalidate", allowNull: false });
          customer.hasMany(models.invoice, { foreignKey: "idinvoice", allowNull: false });
          customer.hasMany(models.orderbook, { foreignKey: "idorderbook", allowNull: false });
          customer.hasMany(models.sale, { foreignKey: "idsale", allowNull: false });
         
        }
    },*/

    getterMethods: {
        fullname: function () { return this.firstname + " " + this.lastname }
      },
      setterMethods: {
        fullName: function (value) {
          var names = value.split(" ");
          this.setDataValue("firstname", names.slice(0, -1).join(" "));
          this.setDataValue("lastname", names.slice(-1).join(" "));
    },
      }
    }
  );
    return customer;
}

/*	fullname	        STRING		not null
	numberid	        STRING		not null
	address		STRING		null
	phone		STRING		null
	email		STRING 		null
    */