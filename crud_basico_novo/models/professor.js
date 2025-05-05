module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define(
        "Professor", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });;

    Professor.associate = (models) => {
        Professor.hasMany(models.Materia, {
            foreignKey: "professorId",
            as: "materias",
        });
    };

    return Professor;
};