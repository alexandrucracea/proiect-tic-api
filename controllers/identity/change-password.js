const { error, initializeFirestore } = require('../../functions');
const { hashSync } = require('bcryptjs');

module.exports = async (req, res) => {
  if (!req.user?.me) {
    throw error(404, 'Missing required params');
  }

  const { changePassword, confirmPassword } = req.body;
  if (!changePassword || !confirmPassword) {
    throw error(400, 'Missing required params');
  }

  if (changePassword !== confirmPassword) {
    throw error(400, 'Passwords do not match');
  }

  const db = initializeFirestore();
  const identityRef = db.collection('identities').doc(req.user.me);
  const doc = await identityRef.get();
  if (!doc.exists) {
    throw error(404, 'Account not found');
  }

  await identityRef.update({
    password: hashSync(changePassword),
  });

  const data = (await identityRef.get()).data();

  return res.status(200).json({
    data,
    message: 'Password was changed successfully',
  });
};
