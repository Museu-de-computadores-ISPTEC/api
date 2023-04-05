import { HasManyOptions, Model, DataTypes } from 'sequelize';
import sequelize from './conexao';

class AdministradorCodigoConfirmacao extends Model{ }

AdministradorCodigoConfirmacao.init({
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'administrador_codigo_confirmacao',
    modelName: 'AdministradorCodigoConfirmacao',
    timestamps: true
});

class Administrador extends Model{}

Administrador.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },

}, {
    sequelize,
    timestamps: true,
    tableName: "administrador",
    modelName: 'Administrador'
});

Administrador.hasMany(AdministradorCodigoConfirmacao, {
    foreignKey: 'id_administrador', as: 'administrador'
});
AdministradorCodigoConfirmacao.belongsTo(Administrador, {
    foreignKey: 'id_administrador'
});

AdministradorCodigoConfirmacao.sync();
Administrador.sync();

export {Administrador, AdministradorCodigoConfirmacao };