module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define( "Aluno", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    Aluno.associate = (models) => {
        Aluno.hasMany(models.Curso, {
            foreignKey: "alunoId",
            as: "cursos",
        });
    };

    return Aluno;
};