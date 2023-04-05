import { HasManyOptions, Model, DataTypes } from 'sequelize';
import sequelize from './conexao';

class UsuarioCodigoConfirmacao extends Model{ }

UsuarioCodigoConfirmacao.init({
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'usuario_codigo_confirmacao',
    modelName: 'UsuarioCodigoConfirmacao',
    timestamps: true
});

class Usuario extends Model{}

Usuario.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },

}, {
    sequelize,
    timestamps: true,
    tableName: "usuario",
    modelName: 'Usuario'
});

Usuario.hasMany(UsuarioCodigoConfirmacao, {
    foreignKey: 'id_usuario', as: 'usuario'
});
UsuarioCodigoConfirmacao.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
});

UsuarioCodigoConfirmacao.sync();
Usuario.sync();

export {Usuario, UsuarioCodigoConfirmacao };