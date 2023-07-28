const { EntitySchema } = require('typeorm');

const Contact = new EntitySchema({
  name: 'Contact',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    phoneNumber: {
      type: 'varchar',
      nullable: true,
    },
    email: {
      type: 'varchar',
      nullable: true,
    },
    linkedId: {
      type: 'int',
      nullable: true,
    },
    linkPrecedence: {
      type: 'enum',
      enum: ['primary', 'secondary'],
      default: 'primary',
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
    },
    deletedAt: {
      type: 'datetime',
      nullable: true,
    },
  },
});

module.exports = Contact;
