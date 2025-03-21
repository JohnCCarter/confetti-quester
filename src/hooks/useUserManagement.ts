
import { useUserData } from './useUserData';
import { useAchievements } from './useAchievements';
import { useRewards } from './useRewards';
import { defaultIsabelAchievements } from './useUserConstants';

export { defaultUser, alternateUser, defaultIsabelAchievements, defaultZozoAchievements } from './useUserConstants';

export const useUserManagement = () => {
  const { 
    user, 
    setUser, 
    tasks, 
    setTasks, 
    rewards, 
    setRewards, 
    achievements, 
    setAchievements, 
    handleSaveUser, 
    handleSwitchUser, 
    isIsabel 
  } = useUserData();

  // Initialize achievements monitoring
  useAchievements(tasks, user, achievements, setAchievements, setUser);

  // Setup rewards management
  const { handleSaveReward, handleRedeemReward, handleDeleteReward } = useRewards(
    rewards, 
    setRewards, 
    user, 
    setUser, 
    achievements, 
    setAchievements
  );

  return {
    user,
    setUser,
    tasks,
    setTasks,
    rewards,
    setRewards,
    achievements,
    setAchievements,
    handleSwitchUser,
    handleSaveUser,
    handleSaveReward,
    handleRedeemReward,
    handleDeleteReward,
    isIsabel,
    totalAchievements: defaultIsabelAchievements.length
  };
};
