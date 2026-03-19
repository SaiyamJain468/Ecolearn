const Student = require('./models/Student');
const School = require('./models/School');
const Submission = require('./models/Submission');

class EcoPointsEngine {
  static async award(studentId, points, reason, submissionId = null) {
    try {
      const student = await Student.findById(studentId).populate('school');
      if (!student) throw new Error('STUDENT_NOT_FOUND');

      // 1. Update Student Total
      student.eco_points_total += points;
      
      // 2. Daily Streak Logic
      const today = new Date().setHours(0, 0, 0, 0);
      const lastActive = student.last_active_date ? new Date(student.last_active_date).setHours(0, 0, 0, 0) : null;
      
      if (lastActive) {
        const diffDays = (today - lastActive) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
          student.streak_days += 1;
        } else if (diffDays > 1) {
          student.streak_days = 1;
        }
      } else {
        student.streak_days = 1;
      }
      student.last_active_date = new Date();
      await student.save();

      // 3. Update School Total
      if (student.school) {
        student.school.eco_points_total += points;
        await student.school.save();
      }

      // 4. Update Submission if applicable
      if (submissionId) {
        await Submission.findByIdAndUpdate(submissionId, { 
            status: 'approved', 
            points_awarded: points,
            reviewed_at: new Date()
        });
      }

      console.log(`>>> GAIA_AWARD_SUCCESS: ${points} XP -> ${student.first_name} [REASON: ${reason}]`);
      return { success: true, points, student };
    } catch (err) {
      console.error('>>> GAIA_AWARD_CRITICAL_ERROR:', err.message);
      throw err;
    }
  }
}

module.exports = EcoPointsEngine;
