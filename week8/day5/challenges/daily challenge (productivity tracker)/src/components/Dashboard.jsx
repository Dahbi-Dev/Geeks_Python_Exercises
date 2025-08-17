import { useSelector } from 'react-redux'
import { selectTaskStats } from '../store/selectors'

const Dashboard = () => {
    const taskStats = useSelector(selectTaskStats)

    return (
        <div className="dashboard">
            <h2>Productivity Dashboard</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-number">{taskStats.total}</div>
                    <div className="stat-label">Total Tasks</div>
                </div>

                <div className="stat-card completed">
                    <div className="stat-number">{taskStats.completed}</div>
                    <div className="stat-label">Completed</div>
                </div>

                <div className="stat-card in-progress">
                    <div className="stat-number">{taskStats.inProgress}</div>
                    <div className="stat-label">In Progress</div>
                </div>

                <div className="stat-card pending">
                    <div className="stat-number">{taskStats.pending}</div>
                    <div className="stat-label">Pending</div>
                </div>
            </div>

            <div className="completion-rate">
                <h3>Completion Rate</h3>
                <div className="completion-bar">
                    <div
                        className="completion-fill"
                        style={{ width: `${taskStats.completionRate}%` }}
                    />
                </div>
                <span className="completion-percentage">{taskStats.completionRate}%</span>
            </div>
        </div>
    )
}

export default Dashboard
