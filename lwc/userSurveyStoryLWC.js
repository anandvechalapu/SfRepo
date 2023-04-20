// Javascript file for lwc component for User survey story

//Function to match Survey to user based on their criteria
const matchSurveyToUser = (user) => {
  //Get user's specialty, preferences, and location
  const { specialty, preferences, location } = user;

  //Query database for surveys that match user's criteria
  const surveys = db.query(`SELECT * FROM surveys WHERE specialty = ${specialty} 
  AND preferences = ${preferences} AND location = ${location} AND status = 'Active' 
  AND is_completed = false AND is_cancelled = false`);

  //Return list of surveys
  return surveys;
};

//Function to display survey to logged-in user
const displaySurvey = (user) => {
  //Get list of surveys
  const surveys = matchSurveyToUser(user);

  //Check if user is logged in
  const isLoggedIn = checkUserLogin(user);

  //Display survey to logged-in users only
  if (isLoggedIn) {
    //Render survey list
    renderSurveyList(surveys);
  }
};

//Function to provide a "Skip" option for users who do not wish to take a survey
const skipSurvey = (user, survey) => {
  //Get user's survey list
  const surveys = matchSurveyToUser(user);

  //Remove survey from user's survey list
  const updatedSurveys = surveys.filter(item => item !== survey);

  //Update user's survey list in database
  db.update(`UPDATE users SET surveys = ${updatedSurveys} WHERE user_id = ${user.id}`);

  //Render updated survey list
  renderSurveyList(updatedSurveys);
};

//Function to allow the admin to download survey reports in a downloadable format
const downloadSurveyReport = (surveys) => {
  //Format surveys into CSV or Excel
  const report = formatToCSVorExcel(surveys);

  //Download report
  downloadFile(report);
};