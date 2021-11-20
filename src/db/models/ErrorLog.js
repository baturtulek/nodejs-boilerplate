module.exports = (sequelize, DataTypes) => {
  const ErrorLog = sequelize.define(
    "ErrorLog",
    {
      level: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      statusCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      errorDetail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stackTrace: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      station: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "error_log",
      schema: "public",
      timestamps: false,
    }
  );
  ErrorLog.associate = (DB) => {
    DB.ErrorLog.belongsTo(DB.User, {
      foreignKey: "userId",
    });
  };
  return ErrorLog;
};
