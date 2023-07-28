const { getConnection } = require('typeorm');

const identifyContact = async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    const connection = await getConnection();

    // Fetch the primary contact from the database
    const primaryContact = await connection.query(
      'SELECT * FROM Contact WHERE (email = ? OR phoneNumber = ?) AND linkPrecedence = ?',
      [email, phoneNumber, 'primary']
    );

    // Fetch secondary contacts linked to the primary contact
    const secondaryContacts = await connection.query(
      'SELECT * FROM Contact WHERE linkedId = ? AND linkPrecedence = ?',
      [primaryContact[0].id, 'secondary']
    );

    // Consolidate the contact information
    const emails = [primaryContact[0].email, ...secondaryContacts.map((contact) => contact.email)];
    const phoneNumbers = [primaryContact[0].phoneNumber, ...secondaryContacts.map((contact) => contact.phoneNumber)];
    const secondaryContactIds = secondaryContacts.map((contact) => contact.id);

    // Send the response
    res.status(200).json({
      contact: {
        primaryContactId: primaryContact[0].id,
        emails,
        phoneNumbers,
        secondaryContactIds,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  identifyContact,
};
