import React, { useState } from 'react';
import DailyLogForm from './DailyLogForm';

function CatProfilePage() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <button onClick={() => setDialogOpen(true)}>Add Daily Log</button>
      
      <DailyLogForm open={isDialogOpen} handleClose={handleDialogClose} />
    </>
  );
}


export default CatProfilePage;