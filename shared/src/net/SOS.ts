export interface Location {
    X: number
    Y: number
    Z: number
}

export interface Team {
    color_primary: string
    color_secondary: string
    name: string
    score: number
}

export interface Player {
    assists: number
    attacker: string
    boost: number
    cartouches: number
    demos: number
    goals: number
    hasCar: boolean
    id: string
    isDead: boolean
    isPowersliding: boolean
    isSonic: boolean
    location: Location & { pitch: number, roll: number, yaw: number }
    name: string
    onGround: boolean
    onWall: boolean
    primaryID: string
    saves: number
    score: number
    shortcut: number
    shots: number
    speed: number
    team: number
    touches: number
}

export enum Events {
    Version = `sos:version`,
    MatchCreated = `game:match_created`,
    Initialized = `game:initialized`,
    PreCountdownBegin = `game:pre_countdown_begin`,
    PostCountDownBegin = `game:post_countdown_begin`,
    UpdateState = `game:update_state`,
    BallHit = `game:ball_hit`,
    StatFeed = `game:statfeed_event`,
    GoalScored = `game:goal_scored`,
    ReplayStart = `game:replay_start`,
    ReplayWillEnd = `game:replay_will_end`,
    ReplayEnd = `game:replay_end`,
    MatchEnded = `game:match_ended`,
    PodiumStart = `game:podium_start`,
    MatchDestroyed = `game:match_destroyed`,
    ClockStarted = `game:clock_started`,
    ClockUpdatedSeconds = `game:clock_updated_seconds`,
    ClockStopped = `game:clock_stopped`,
    RoundStartedGo = `game:round_started_go`
}

export enum StatFeedEvents {
    Goal = `Goal`,
    Assist = `Assist`,
    Save = `Save`,
    Shot = `Shot`,
    Demo = `Demo`,
    Win = `Win`,
    MVP = `MVP`
}

export interface Version {
    event: Events.Version
    data: string
}

export interface MatchCreated {
    event: Events.MatchCreated
    data: string
}

export interface Initialized {
    event: Events.Initialized
    data: string
}

export interface PreCountdownBegin {
    event: Events.PreCountdownBegin
    data: string
}

export interface PostCountDownBegin {
    event: Events.PostCountDownBegin
    data: string
}

export interface UpdateState {
    event: Events.UpdateState
    data: {
        event: string
        game: {
            arena: string
            ball: {
                location: Location
                speed: number
                team: number
            }
            hasTarget: boolean
            hasWinner: boolean
            isOT: boolean
            isReplay: boolean
            target: string
            teams: {
                [`0`]: Team
                [`1`]: Team
            }
            time_milliseconds: number
            time_seconds: number
            winner: string
        }
        hasGame: boolean
        match_guid: string
        players: Record<string, Player>
    }
}

export interface BallHit {
    event: Events.BallHit
    data: {
        ball: {
            location: Location
            pre_hit_speed: number
            post_hit_speed: number
        }
        player: {
            id: string
            name: string
        }
    }
}

export interface StatFeed {
    event: Events.StatFeed
    data: {
        event_name: StatFeedEvents
        main_target: {
            id: string
            name: string
            team_num: number
        }
        secondary_target: {
            id: string
            name: string
            team_num: number
        }
        type: string
    }
}

export interface GoalScored {
    event: Events.GoalScored
    data: {
        ball_last_touch: {
            player: string
            speed: number
        }
        goalspeed: number
        goaltime: number
        impact_location: Omit<Location, `Y`>
        scorer: {
            id: string
            name: string
            teamnum: number
        }
        assister: {
            id: string
            name: string
        }
    }
}

export interface ReplayStart {
    event: Events.ReplayStart
    data: string
}

export interface ReplayWillEnd {
    event: Events.ReplayWillEnd
    data: string
}

export interface ReplayEnd {
    event: Events.ReplayEnd
    data: string
}

export interface MatchEnded {
    event: Events.MatchEnded
    data: {
        winner_team_num: number
    }
}

export interface PodiumStart {
    event: Events.PodiumStart
    data: string
}

export interface MatchDestroyed {
    event: Events.MatchDestroyed
    data: string
}

export interface ClockUpdatedSeconds {
    event: Events.ClockUpdatedSeconds
    data: {
        match_guid: string
    }
}
