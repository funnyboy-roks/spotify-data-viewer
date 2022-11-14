export interface SimpleStream {
	msPlayed: number;
	trackName: string;
	artistName: string;
	endTime: string;
}

export interface SimpleSong {
	title: string;
	artist: string;
	totalMsPlayed: number;
}

export interface ExtendedStream {
	ts: string; // timestamp
	username: string; // Username (encoded in some way)
	platform: string;
	ms_played: number;
	conn_country: string;
	ip_addr_decrypted: string;
	user_agent_decrypted: string;
	master_metadata_track_name: string;
	master_metadata_album_artist_name: string;
	master_metadata_album_album_name: string;
	spotify_track_uri: string;
	episode_name: string | null;
	episode_show_name: string | null;
	spotify_episode_uri: string | null;
	reason_start: 'fwdbtn' | 'trackdone' | 'playbtn' | 'clickrow' | 'backbtn' | 'appload' | 'trackerror' | 'remote' | 'unknown';
	reason_end: 'fwdbtn' | 'trackdone' | 'playbtn' | 'clickrow' | 'backbtn' | 'appload' | 'trackerror' | 'remote' | 'unknown';
	shuffle: boolean;
	skipped: null;
	offline: boolean;
	offline_timestamp: number;
	incognito_mode: boolean;
}
