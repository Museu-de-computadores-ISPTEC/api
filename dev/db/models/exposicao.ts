import { HasManyOptions, Model, DataTypes } from 'sequelize';
import sequelize from './conexao';


class ExposicaoSlideSub extends Model{}

ExposicaoSlideSub.init({
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posicao: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'exposicao_slide_sub',
    modelName: 'ExposicaoSlideSub',
    timestamps: true
});

class ExposicaoSlide extends Model{}
ExposicaoSlide.init({
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posicao: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'exposicao_slide',
    modelName: 'ExposicaoSlide',
    timestamps: true
});


class Exposicao extends Model{}

Exposicao.init({
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img_capa: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'exposicao',
    modelName: 'Exposicao',
    timestamps: true
})


Exposicao.hasMany(ExposicaoSlide, {
    foreignKey: 'id_exposicao', as: 'exposicao',
    onDelete: 'SET NULL',
});

ExposicaoSlide.hasMany(ExposicaoSlideSub, {
    foreignKey: 'id_exposicao_slide', as: 'exposicao_slide',
    onDelete: 'SET NULL',
});

ExposicaoSlide.belongsTo(Exposicao, {
    foreignKey: 'id_exposicao'
});

ExposicaoSlideSub.belongsTo(ExposicaoSlide, {
    foreignKey: 'id_exposicao_slide'
});

Exposicao.sync();
ExposicaoSlide.sync();
ExposicaoSlideSub.sync();



export {Exposicao, ExposicaoSlide, ExposicaoSlideSub };