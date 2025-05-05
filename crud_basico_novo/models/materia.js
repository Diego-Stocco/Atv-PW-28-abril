module.exports = (sequelize, DataTypes) => {
    const Materia = sequelize.define("Materia", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Materia.associate = (models) => {
        Materia.belongsTo(models.Professor, {
            foreignKey: "professorId",
            as: "Professor",
        });
    };

    return Materia;
};
