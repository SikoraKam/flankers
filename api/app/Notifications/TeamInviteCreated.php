<?php

namespace App\Notifications;

use App\Models\Team;
use Illuminate\Bus\Queueable;
use App\Broadcasting\ExpoChannel;
use App\Contracts\ExpoNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class TeamInviteCreated extends ExpoNotification implements ShouldQueue
{
    use Queueable;

    public $team;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Team $team)
    {
        $this->team = $team;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array
     */
    public function via()
    {
        return [ExpoChannel::class];
    }

    /**
     * Convert notification to expo request data
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toExpo($notifiable): array
    {
        return [
            "title" => __("Your were invited to join a team!"),
            "body" => "{$this->team->name} " . __("are calling"),
            "data" => json_encode(["type" => "team_invite"])
        ];
    }
}
