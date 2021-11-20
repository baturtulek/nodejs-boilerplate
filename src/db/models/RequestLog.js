module.exports = (sequelize, DataTypes) => {
  const RequestLog = sequelize.define(
    "RequestLog",
    {
      ip: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      httpMethod: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      httpBody: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      httpParams: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      httpQuery: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      requestProcessTime: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      userAgent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "request_log",
      schema: "public",
      timestamps: false,
    }
  );
  return RequestLog;
};
