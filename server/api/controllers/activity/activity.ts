import Container from "typedi";
import ActivityService from "../../services/activity/activity";

export default {
  async logActivity(req, res) {
    try {
      const activityService = Container.get(ActivityService);
      await activityService.createUserFromGithubID(req.user);
      const result = activityService.logActivity(req.body, req.user);
      return res.status(200).json({
        result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  async getActivityTotals(req, res) {
    try {
      const activityService = Container.get(ActivityService);
      const activity_totals = await activityService.getActivityTotals(req.user.id);
      return res.status(200).json({
        activity_totals,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  async getActivityDates(req, res) {
    try {
      const activityService = Container.get(ActivityService);
      const activity_dates = await activityService.getActivityDates(
        req.user.id,
      );
      return res.status(200).json({
        activity_dates,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
