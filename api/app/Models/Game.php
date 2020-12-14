<?php

namespace App\Models;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Game extends Model
{
    use HasFactory;

    /**
     * Return squads registered to the game
     *
     * @return HasMany
     */
    public function squads()
    {
        return $this->hasMany(Squad::class);
    }

    /**
     * Return player memos related to the class
     *
     * @return HasMany
     */
    public function memos()
    {
        return $this->hasMany(Memo::class);
    }

    /**
     * Return players registered to the game
     *
     * @return Collection
     */
    public function getPlayersAttribute()
    {
        return $this->squads()->with('members')->get()->pluck('members')->flatten();
    }

    /**
     * Return concatenated game coordinates
     *
     * @return Collection
     */
    public function getLocationAttribute()
    {
        return "{$this->long},{$this->lat}";
    }
}
